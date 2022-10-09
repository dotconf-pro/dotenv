const fs = require('fs')

const sinon = require('sinon')
const t = require('tap')


const dotenv = require('../lib/main')

const mockParseResponse = { test: 'foo' }
let readFileSyncStub
let parseStub

t.beforeEach(() => {
  readFileSyncStub = sinon.stub(fs, 'readFileSync').returns('test=foo')
  parseStub = sinon.stub(dotenv, 'parse').returns(mockParseResponse)
})

t.afterEach(() => {
  readFileSyncStub.restore()
  parseStub.restore()
})

t.test('takes option for path', ct => {
  ct.plan(1)

  const testPath = 'tests/.env'
  dotenv.config({ path: testPath })

  ct.equal(readFileSyncStub.args[0][0], testPath)
})
