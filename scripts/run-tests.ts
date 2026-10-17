import { testAuthGuard } from "../tests/auth-guard.test"
import { testRlsRules } from "../tests/rls-rules.test"
import { testProjectCrud } from "../tests/project-crud.test"

console.log("==================================================================")
console.log("🚀 RUNNING PORTFOLIO UPGRADE TEST SUITE")
console.log("==================================================================\n")

try {
  testAuthGuard()
  testRlsRules()
  testProjectCrud()
  console.log("🎉 ALL TESTS PASSED SUCCESSFULLY! (3/3 test suites)")
} catch (error) {
  console.error("❌ Test suite failed with error:", error)
  process.exit(1)
}
