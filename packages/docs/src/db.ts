import lovefield, { Database } from 'lovefield';
import Device from './context/EnvironmentContext/Device';

class StorageDB {
  private _db?: Database;
  private _setup?: Promise<void>;

  get db() {
    if (!this._db) {
      throw new Error('DB not initialized');
    }
    return this._db;
  }

  get isReady() {
    return this._setup;
  }

  setup = () => {
    if (!this._setup) {
      const run = async () => {
        const builder = lovefield.schema.create('iot', 3);
        builder
          .createTable('files')
          .addColumn('location', lovefield.Type.STRING)
          .addColumn('content', lovefield.Type.STRING)
          .addPrimaryKey(['location']);

        builder
          .createTable('homes')
          .addColumn('key', lovefield.Type.STRING)
          .addColumn('name', lovefield.Type.STRING)
          .addPrimaryKey(['key']);

        builder
          .createTable('devices')
          .addColumn('home', lovefield.Type.STRING)
          .addColumn('key', lovefield.Type.STRING)
          .addColumn('baseKey', lovefield.Type.STRING)
          .addColumn('type', lovefield.Type.STRING)
          .addColumn('config', lovefield.Type.OBJECT)
          .addPrimaryKey(['key']);

        this._db = await builder.connect();
      };
      this._setup = run();
    }

    return this._setup;
  };

  getHomes = async () => {
    await this.setup();
    const homes = this.db.getSchema().table('homes');
    const results = await this.db.select().from(homes).exec();
    return results.reduce(
      (output: any, current: any) => ({
        ...output,
        [current.key]: current.name,
      }),
      {} as { [key: string]: string }
    );
  };

  setHome = async (key: string, name: string) => {
    await this.setup();
    const homes = this.db.getSchema().table('homes');
    const row = homes.createRow({
      key,
      name,
    });
    await this.db.insertOrReplace().into(homes).values([row]).exec();
  };

  removeHome = async (key: string) => {
    await this.setup();
    const homes = this.db.getSchema().table('homes');
    await this.db.delete().from(homes).where(homes.key.eq(key)).exec();
  };

  getDevices = async () => {
    await this.setup();
    const devices = this.db.getSchema().table('devices');
    const results = await this.db.select().from(devices).exec();
    return results as Device[];
  };

  setDevice = async (device: Device) => {
    await this.setup();
    const devices = this.db.getSchema().table('devices');
    const row = devices.createRow({ ...device });
    await this.db.insertOrReplace().into(devices).values([row]).exec();
  };

  removeDevice = async (key: string) => {
    await this.setup();
    const devices = this.db.getSchema().table('devices');
    await this.db.delete().from(devices).where(devices.key.eq(key)).exec();
  };

  deleteFile = async (location: string) => {
    await this.setup();
    const files = this.db.getSchema().table('files');
    await this.db
      .delete()
      .from(files)
      .where(files.location.eq(location))
      .exec();
  };

  setFile = async (location: string, content: string) => {
    await this.setup();
    const files = this.db.getSchema().table('files');
    const row = files.createRow({ location, content });
    await this.db.insertOrReplace().into(files).values([row]).exec();
  };

  getFiles = async () => {
    await this.setup();
    const files = this.db.getSchema().table('files');
    return this.db.select().from(files).exec();
  };
}

export default new StorageDB();
