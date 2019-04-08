import cdk = require("@aws-cdk/cdk");
import codecommit = require("@aws-cdk/aws-codecommit");
import codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
import cpapi = require("@aws-cdk/aws-codepipeline");

export class CodeCommitCreator {
  /**
   * Create CodeCommit Repository
   * @param {cdk.Construct} self
   * @param {String} repositoryName
   */
  static CreateRepository(self: cdk.Construct, repositoryName: string) {
    return new codecommit.Repository(self, repositoryName, {
      repositoryName: repositoryName
    });
  }

  /**
   * Create CodePipeline Source Stage
   * @param {codecommit.Repository} repo
   * @param {String} targetBranch
   */
  static CreateSourceAction(repo: codecommit.Repository, targetBranch: string) {
    return new codepipeline_actions.CodeCommitSourceAction({
      actionName: "Source",
      outputArtifactName: "SourceArtifact",
      branch: targetBranch,
      repository: repo
    })
  }

  /**
   * Add CodePipeline Source Stage
   * @param {cpapi.IStage} sourceStage
   * @param {cpapi.SourceAction} sourceAction
   */
  static AddSourceAction(sourceStage: cpapi.IStage, sourceAction: cpapi.SourceAction) {
    sourceStage.addAction(sourceAction);
  }
}
