export const ApiRoutes = ({
  AuthRoutes,
  UserRoutes
}: any) => ([
  AuthRoutes.routes,
  UserRoutes.routes
])
