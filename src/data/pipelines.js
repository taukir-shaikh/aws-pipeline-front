// src/data/pipelines.js
export const pipelines = {
  agent: [
    { id: 1, name: "agent-uat1-pipeline", status: "Active", region: "us-east-1" },
    { id: 2, name: "agent-uat2-pipeline", status: "Inactive", region: "us-east-2" },
    { id: 3, name: "agent-uat3-pipeline", status: "Active", region: "ap-south-1" },
  ],
  core: [
    { id: 4, name: "core-uat1-pipeline", status: "Active", region: "us-east-1" },
    { id: 5, name: "core-uat2-pipeline", status: "Active", region: "ap-south-1" },
    { id: 6, name: "core-uat3-pipeline", status: "Inactive", region: "eu-west-1" },
  ],
  employee: [
    { id: 4, name: "employee-uat1-pipeline", status: "Active", region: "us-east-1" },
    { id: 5, name: "employee-uat2-pipeline", status: "Active", region: "ap-south-1" },
    { id: 6, name: "employee-uat3-pipeline", status: "Inactive", region: "eu-west-1" },
  ],
  policy: [
    { id: 4, name: "policy-uat1-pipeline", status: "Active", region: "us-east-1" },
    { id: 5, name: "policy-uat2-pipeline", status: "Active", region: "ap-south-1" },
    { id: 6, name: "policy-uat3-pipeline", status: "Inactive", region: "eu-west-1" },
  ],
};
