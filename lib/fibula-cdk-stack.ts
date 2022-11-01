import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FibulaLambdas } from './fibula-lambdas';
import {aws_s3 as s3} from 'aws-cdk-lib'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FibulaCdkStack extends cdk.Stack {
  readonly fibulaLambdas = FibulaLambdas;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'CDKBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });
    // Lambdas
    

    // SNS Topic


    // API


  }
}
