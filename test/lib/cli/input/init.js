const initInput = require('../../../../lib/cli/input/init');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const inquirer = require('inquirer');

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();

mockUser = {u: 'testuser', p:'123'};

describe('for init getInput', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  })

  it('should return promise with correct values when flags provided', () => {
    return initInput.getInput(null, mockUser).should.eventually.deep.equal({
      username: mockUser.u,
      password: mockUser.p
    });
  });

  it('should return promise with correct values when flags not provided', () => {
    const mockInquirer = sandbox.mock(inquirer);
    mockInquirer.expects('prompt').returns(Promise.resolve({username: 'testuser2', password: '123'}));

    return initInput.getInput(null, {}).should.eventually.deep.equal({
      username: 'testuser2',
      password: '123'
    });;

  });

  it('should not accept empty getInput', () => {
    let stdin = require('mock-stdin').stdin();
    setTimeout(() => stdin.send('\n'), 1);
    setTimeout(() => stdin.send('testuser2\n'), 2);
    setTimeout(() => stdin.send('\n'), 3);
    setTimeout(() => stdin.send('123\n'), 4);

    return initInput.getInput(null, {}).should.eventually.deep.equal({
      username: 'testuser2',
      password: '123'
    });;

  });

});
