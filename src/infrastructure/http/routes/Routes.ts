export const ApiRoutes = ({
  AuthRoutes,
  UserRoutes,
  PokedexRoutes,
}: any) => ([
  AuthRoutes.routes,
  UserRoutes.routes,
  PokedexRoutes.routes,
])
