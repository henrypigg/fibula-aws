import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { FemrStage, LogicalStage } from './femr-prod-stage';

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);
    
        const pipeline = new CodePipeline(this, 'FibulaPipeline', {
            pipelineName: 'FibulaPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.connection('henrypigg/fibula-aws', 'main', {
                    connectionArn: 'arn:aws:codestar-connections:us-east-1:374516698077:connection/20bdd642-8d2a-49ce-91e3-5caa0e02ef92', // Created using the AWS console
                }),
                commands: [
                    'cd resources/fibula-react-app', 
                    'npm install',
                    'npm ci', 
                    'npm run build', 
                    'cd ../..', 
                    'npm install',
                    'npm ci', 
                    'npm run build', 
                    'npx cdk synth'
                ]
            }),
            dockerEnabledForSynth: true
        });

        /*
        pipeline.addStage(new FemrStage(this, "Dev", {
            env: { account: {DEV_ACCOUNT}, region: {DEV_REGION}},
            logicalStage: LogicalStage.DEV
        }))
        */

        pipeline.addStage(new FemrStage(this, "Prod", {
            env: { account: '374516698077', region: 'us-east-1'},
            logicalStage: LogicalStage.PROD
        }))
    }
}
  