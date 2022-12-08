import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { FibulaCdkStack } from './fibula-cdk-stack';

export class FemrProdStage extends cdk.Stage {
     
    constructor(scope: Construct, id: string, props: cdk.StageProps) {
        super(scope, id, props);
  
        const fibulaStack = new FibulaCdkStack(this, 'FibulaStack', {
            env: props.env
        });
    }
}