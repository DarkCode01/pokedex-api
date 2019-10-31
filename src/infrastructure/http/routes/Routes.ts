export const ApiRoutes = (props: {
  AuthRoutes: IRoutes,
  UserRoutes: IRoutes,
  PokedexRoutes: IRoutes,
  PokemonRoutes: IRoutes,
}) => ([
  props.AuthRoutes.routes,
  props.UserRoutes.routes,
  props.PokedexRoutes.routes,
  props.PokemonRoutes.routes,
])
