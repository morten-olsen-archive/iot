import lovefield, { Database } from 'lovefield';

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
        const builder = lovefield.schema.create('iot', 1);
        builder
          .createTable('files')
          .addColumn('location', lovefield.Type.STRING)
          .addColumn('content', lovefield.Type.STRING)
          .addPrimaryKey(['location']);
        this._db = await builder.connect();
      };
      this._setup = run();
    }

    return this._setup;
  };

  deleteFile = async (location: string) => {
    const files = this.db.getSchema().table('files');
    await this.db
      .delete()
      .from(files)
      .where(files.location.eq(location))
      .exec();
  };

  setFile = async (location: string, content: string) => {
    const files = this.db.getSchema().table('files');
    const row = files.createRow({ location, content });
    await this.db.insertOrReplace().into(files).values([row]).exec();
  };

  getFiles = async () => {
    const files = this.db.getSchema().table('files');
    return this.db.select().from(files).exec();
  };
}

export default new StorageDB();
