#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { FibulaCdkStack } from '../lib/fibula-cdk-stack';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
new PipelineStack(app, 'FibulaPipelineStack', {
  env: { account: '542839501738', region: 'us-east-1'}
});

app.synth();