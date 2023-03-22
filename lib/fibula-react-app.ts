import { CfnOutput } from "aws-cdk-lib";
import { CloudFrontAllowedCachedMethods, CloudFrontAllowedMethods, CloudFrontWebDistribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { Bucket, CfnBucket, IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class FibulaReactApp extends Construct {
    readonly s3Site: Bucket;
    readonly distribution: CloudFrontWebDistribution;

    constructor(scope: Construct, id: string) {
      super(scope, id);

      // Add S3 Bucket
      this.s3Site = new Bucket(this, 'FibulaReactApp', {
        bucketName: `fibulareactapp-bucket`,
        publicReadAccess: true,
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html"
      });
      this.enableCorsOnBucket(this.s3Site);
  
      // Create a new CloudFront Distribution
      this.distribution = new CloudFrontWebDistribution(
        this,
        `fibulareactapp-cf-distribution`,
        {
          originConfigs: [
            {
              s3OriginSource: {
                s3BucketSource: this.s3Site
              },
              behaviors: [
                {
                  isDefaultBehavior: true,
                  compress: true,
                  allowedMethods: CloudFrontAllowedMethods.ALL,
                  cachedMethods:
                    CloudFrontAllowedCachedMethods.GET_HEAD_OPTIONS,
                  forwardedValues: {
                    queryString: true,
                    cookies: {
                      forward: "none"
                    },
                    headers: [
                      "Access-Control-Request-Headers",
                      "Access-Control-Request-Method",
                      "Origin"
                    ]
                  }
                }
              ]
            }
          ],
          comment: `fibulareactapp - CloudFront Distribution`,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        }
      );
  
      // Setup Bucket Deployment to automatically deploy new assets and invalidate cache
      new BucketDeployment(this, `fibulareactapp-s3bucketdeployment`, {
        sources: [Source.asset("resources/fibula-react-app")],
        destinationBucket: this.s3Site,
        distribution: this.distribution,
        distributionPaths: ["/*"],
        memoryLimit: 4096
      });
      
      // Final CloudFront URL
      new CfnOutput(this, "CloudFront URL", {
        value: this.distribution.distributionDomainName
      });
    }
  
    enableCorsOnBucket = (bucket: IBucket) => {
      const cfnBucket = bucket.node.findChild("Resource") as CfnBucket;
      cfnBucket.addPropertyOverride("CorsConfiguration", {
        CorsRules: [
          {
            AllowedOrigins: ["*"],
            AllowedMethods: ["HEAD", "GET", "PUT", "POST", "DELETE"],
            ExposedHeaders: [
              "x-amz-server-side-encryption",
              "x-amz-request-id",
              "x-amz-id-2"
            ],
            AllowedHeaders: ["*"]
          }
        ]
      });
    };
}