export default function (
  authFunction: (username: string, password: string) => boolean
) {
  return function (req, res, next) {
    const fail = () => res.status(401).send("Authentication required")

    // Initial test - check if auth headers are present
    if (!req.headers.authorization) return fail();

    try {
      // Attempt to extract username and password
      let [username, ...passwordSplit] = Buffer.from(/Basic (.+?)/.exec(req.headers.authorization)[1], 'base64').toString().split(":")
      let password = passwordSplit.join(":")

      // Verify against auth check function
      if (!authFunction(username, password)) return fail()

    } catch {
      return fail()
    }

    // Yippeee!
    next()
  }
}