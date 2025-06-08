import { App } from './app';

const PORT = process.env.PORT || 3000;

const appInstance = new App();
appInstance.app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})