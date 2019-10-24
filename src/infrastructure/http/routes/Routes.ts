export const ApiRoutes = ({
  AuthRoutes,
  UserRoutes,
  PokedexRoutes,
  PokemonRoutes,
}: any) => ([
  AuthRoutes.routes,
  UserRoutes.routes,
  PokedexRoutes.routes,
  PokemonRoutes.routes,
])
