let sqlite = require('./index');
let fs = require('fs');
let path = require('path');
let folder = path.join(__dirname, 'test');
let assert = require('assert');
let cfg = {
  path: folder,
  database: 'test'
};



describe('# test', function () {
  
  before(function () {
    if (fs.existsSync(folder)) {
      let list = fs.readdirSync(folder)
      for (let name of list) {
        fs.unlinkSync(path.join(folder,name));  
      }
      fs.rmdirSync(folder);
    }    
  })
  it('create db', async function () {
    let model = sqlite(cfg);
    let rows = await model.model('sqlite_master').select();
    let flag = fs.existsSync(path.join(folder, 'test.sqlite'));
    assert.equal(true, flag);
  })

  it('create table', async function () {
    let model = sqlite(cfg);
    try {
      let rs = await model.model('').execute('create table data (name TEXT,phone TEXT)')
    } catch (error) {
      console.log(error);
    }
    let list = await model.model('sqlite_master').select();
    assert.equal(1, list.length);
  })

  it('insert data', async function () {
    let model = sqlite(cfg);
    let rs = await model.model('data').add({ name: 'sqlite', phone: '110' });
    let list = await model.model('data').select();
    assert.equal('sqlite', list[0].name);
  })

  it('query data', async function () {
    let model = sqlite(cfg);
    let rs = await model.model('data').add({ name: 'sqlite_test', phone: '111' });
    let record = await model.model('data').where({ phone: '110' }).find();
    assert.equal('sqlite', record.name);
  })

  it('delete data', async function () {
    let model = sqlite(cfg);
    await model.model('data').where({ phone: '110' }).delete();
    let record = await model.model('data').where({ phone: '110' }).find();
    assert.equal(null, record.name);
  })
  it('insert many data', async function () {
    let model = sqlite(cfg);
    let tmp = [{ name: '1', phone: '1' }, { name: '2', phone: '2' }];
    let rs = await model.model('data').addMany(tmp);
    let list = await model.model('data').select();
    assert.equal(3, list.length);
  })

})
