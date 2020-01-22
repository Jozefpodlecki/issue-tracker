import homeController from './../controllers/home'
import issueController from './../controllers/issue'

export default (app: any) => {
  app.post("/api/issues/:project", issueController.createIssue);
  app.put("/api/issues/:project", issueController.updateIssue);
  app.delete("/api/issues/:project", issueController.deleteIssue);
  app.get("/api/issues/:project", issueController.getIssues);
  app.get("/", homeController.get);
}