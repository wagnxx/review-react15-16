import * as Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';
const app = new Koa();
const container = createContainer();
container.loadModules([__dirname + '/services/*Service.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
  },
});
app.use(scopePerRequest(container));
app.use(loadControllers(__dirname + '/controllers/*.ts'));

app.listen(3000, () => {
  console.log('server is running over 3000 port');
});
