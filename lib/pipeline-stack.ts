import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { FemrProdStage } from './femr-prod-stage';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);
    
        const pipeline = new CodePipeline(this, 'FibulaPipeline', {
            pipelineName: 'FibulaPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('henrypigg/fibula-aws', 'main', {
                       connectionArn: 'arn:aws:codestar-connections:us-east-1:374516698077:connection/20bdd642-8d2a-49ce-91e3-5caa0e02ef92', // Created using the AWS console
                    }),
                commands: ['npm install', 'npm ci', 'npm run build', 'npx cdk synth'],
            })
        });

        pipeline.addStage(new FemrProdStage(this, "Prod", {
            env: { account: '374516698077', region: 'us-east-1'}
        }))
    }
}
  