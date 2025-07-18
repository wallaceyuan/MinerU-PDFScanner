import { appCacheDir, join } from '@tauri-apps/api/path'
import { Store } from '@tauri-apps/plugin-store'

async function getGlobalStore() {
  if ('__store__' in window) {
    return window['__store__'] as Store
  }
  const dir = await appCacheDir()
  const storePath = await join(dir, '.settings.json') // 改为 .json 后缀（可选）
  const store = await Store.load(storePath)
  // const store = new Store(await join(dir, '.settings.dat'))

  await store.save()
  // @ts-ignore
  window['__store__'] = store
  return store
}

export class SettingsStore<T = any> {
  name: string
  constructor(name: string) {
    this.name = name
  }

  getStore() {
    return getGlobalStore()
  }

  // get
  async get(): Promise<T | null> {
    const store = await this.getStore()
    return store.get<T>(this.name)
  }

  // set
  async set(value: T): Promise<void> {
    const store = await this.getStore()
    await store.set(this.name, value)
    await store.save()
  }

  // clean
  async clear(): Promise<void> {
    const store = await this.getStore()
    await store.set(this.name, null)
  }
}

export { getGlobalStore }

 