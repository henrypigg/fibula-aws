import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);
    
        const pipeline = new CodePipeline(this, 'FibulaPipeline', {
            pipelineName: 'FibulaPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('henrypigg/fibula-aws', 'main', {
                       connectionArn: 'arn:aws:codestar-connections:us-east-1:542839501738:connection/7cc0ec6d-ce30-49bb-9b63-c533fd1d7ec7', // Created using the AWS console
                    }),
                commands: ['npm install', 'npm ci', 'npm run build', 'npx cdk synth'],
            })
        });
    }
}
  