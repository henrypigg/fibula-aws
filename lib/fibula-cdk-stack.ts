import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FibulaLambdas } from './fibula-lambdas';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { FibulaReactApp } from './fibula-react-app';
import { FibulaApi } from './fibula-api';
import { LogicalStage } from './femr-prod-stage';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { AnyPrincipal } from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface FibulaStackProps extends cdk.StackProps {
  logicalStage: LogicalStage
}

export class FibulaStack extends cdk.Stack {
  readonly sendEnrollmentRequestTopic: Topic;
  readonly sendEnrollmentResponseTopic: Topic;
  readonly installerBucket: Bucket;
  readonly fibulaLambdas: FibulaLambdas;
  readonly api: FibulaApi;
  readonly reactApp: FibulaReactApp;

  constructor(scope: Construct, id: string, props: FibulaStackProps) {
    super(scope, id, props);

    // React App
    this.reactApp = new FibulaReactApp(this, 'ReactApp');

    // SNS Topic
    this.sendEnrollmentRequestTopic = new Topic(this, 'SendEnrollmentRequestTopic', {
      displayName: 'Send enrollment request email',
      topicName: 'send-enrollment-request',
    });

    this.sendEnrollmentRequestTopic.addSubscription(
      new EmailSubscription('henry.pigg@gmail.com')
    )

    this.sendEnrollmentResponseTopic = new Topic(this, 'SendEnrollmentResponseTopic', {
      displayName: 'Send enrollment response email',
      topicName: 'send-enrollment-response'
    })

    // S3 Bucket
    this.installerBucket = new Bucket(this, 'InstallerBucket', {
      bucketName: 'fibula-installer'
    });

    // Lambdas
    this.fibulaLambdas = new FibulaLambdas(this, 'Lambdas', {
      requestTopic: this.sendEnrollmentRequestTopic,
      responseTopic: this.sendEnrollmentResponseTopic,
      installerBucket: this.installerBucket,
      domainName: this.reactApp.distribution.distributionDomainName
    });

    // allow people to SNS:Subscribe to sendEnrollmentRequestTopic
    this.sendEnrollmentRequestTopic.addToResourcePolicy(
      new PolicyStatement({
          actions: ['sns:Subscribe'],
          principals: [new AnyPrincipal()],
          resources: [this.sendEnrollmentResponseTopic.topicArn],
          conditions: {
              ArnEquals: { "aws:SourceArn": this.fibulaLambdas.sendRequestLambda.functionArn }
          }
      })
    )

    // API
    this.api = new FibulaApi(this, 'FibulaApi', {
      fibulaLambdas: this.fibulaLambdas
    });

  }
}
