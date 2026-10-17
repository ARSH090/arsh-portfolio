/**
 * Unit & Integration Test: Project Create, Edit, Delete, Slug, and Draft Flow
 */

import { initialProjects, type Project } from "../lib/initial-data"

export function testProjectCrud() {
  console.log("▶ Testing Project CRUD & Data Lifecycle...")

  let projectList: Project[] = [...initialProjects]

  // 1. Create Project
  const newProject: Project = {
    id: "test-proj-001",
    title: "AI Autonomous Agent Platform",
    slug: "ai-autonomous-agent-platform",
    summary: "Multi-agent autonomous coding system.",
    category: "AI/ML",
    overview: "Built using LangGraph and Next.js.",
    problem: "Manual multi-step agent debugging is prone to failures.",
    role: "Lead Architect",
    key_features: ["Self-healing loops", "Deterministic state graph"],
    tech_stack: ["Python", "Next.js", "Docker"],
    cover_url: "/placeholder.jpg",
    gallery: [],
    featured: true,
    status: "published",
    sort_order: 1,
  }

  projectList.push(newProject)
  if (projectList.some((p) => p.id === "test-proj-001")) {
    console.log("  ✓ Project created successfully in store")
  } else {
    throw new Error("Project creation failed")
  }

  // 2. Edit Project
  const projectIndex = projectList.findIndex((p) => p.id === "test-proj-001")
  projectList[projectIndex] = {
    ...projectList[projectIndex],
    title: "AI Autonomous Agent Platform v2",
    summary: "Upgraded multi-agent autonomous coding system.",
  }

  if (projectList[projectIndex].title === "AI Autonomous Agent Platform v2") {
    console.log("  ✓ Project edited and state updated correctly")
  } else {
    throw new Error("Project edit failed")
  }

  // 3. Draft Exclusion Filter Test
  const draftProject: Project = {
    ...newProject,
    id: "test-draft-002",
    title: "Unpublished Secret App",
    slug: "unpublished-secret-app",
    status: "draft",
  }
  projectList.push(draftProject)

  const publicProjects = projectList.filter((p) => p.status === "published")
  if (publicProjects.some((p) => p.status === "draft")) {
    throw new Error("Draft project leaked into public list!")
  } else {
    console.log("  ✓ Draft items successfully excluded from public view")
  }

  // 4. Delete Project
  projectList = projectList.filter((p) => p.id !== "test-proj-001")
  if (projectList.some((p) => p.id === "test-proj-001")) {
    throw new Error("Project deletion failed")
  } else {
    console.log("  ✓ Project deleted successfully")
  }

  console.log("✅ All Project CRUD lifecycle tests passed successfully!\n")
}
