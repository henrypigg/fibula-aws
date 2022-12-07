import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FibulaLambdas } from './fibula-lambdas';
import {aws_s3 as s3} from 'aws-cdk-lib'
import { Subscription, Topic } from 'aws-cdk-lib/aws-sns';
import { EmailSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
// import * as sqs from 'aws-cdk-lib/aws-sqs';



export class FibulaCdkStack extends cdk.Stack {
  readonly sendEnrollmentRequestTopic: Topic;
  readonly fibulaLambdas: FibulaLambdas;

  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    // SNS Topic
    this.sendEnrollmentRequestTopic = new Topic(this, 'SendEnrollmentRequestTopic', {
      displayName: 'Send enrollment request email',
      topicName: 'send-enrollment-request',
    });

    this.sendEnrollmentRequestTopic.addSubscription(
      new EmailSubscription('henry.pigg@gmail.com')
    )

    // Lambdas
    this.fibulaLambdas = new FibulaLambdas(this, 'Lambdas', {
      topic: this.sendEnrollmentRequestTopic
    });
    
    // API


  }
}
