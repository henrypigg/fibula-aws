import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { FibulaStack } from './fibula-cdk-stack';

export enum LogicalStage {
    DEV = 'dev',
    PROD = 'prod'
}

export interface FemrStageProps extends cdk.StageProps {
    logicalStage: LogicalStage
}

export class FemrStage extends cdk.Stage {
    readonly fibulaStack: FibulaStack;
     
    constructor(scope: Construct, id: string, props: FemrStageProps) {
        super(scope, id, props);
  
        this.fibulaStack = new FibulaStack(this, 'FibulaStack', {
            env: props.env,
            logicalStage: props.logicalStage
        });
    }
}