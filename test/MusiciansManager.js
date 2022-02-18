const MusiciansManager = artifacts.require('./MusiciansManager');

contract('MusiciansManager', accounts => {

  it('should add a musician', async function() {
    const Contract = await MusiciansManager.deployed();
    const result = await Contract.addMusician('0xc26e05d784c59d4fc86b1387625ca1150d29f4fb', 'The Weeknd', {from: accounts[0]});
    assert.equal(result.logs[0].args._artistName, "The Weeknd", "Not equal to The Weeknd");
  })

  it('should not add a musician if it already exists', async function() {
    const Contract = await MusiciansManager.deployed();
    let err = null;
    try {
      const result = await Contract.addMusician('0xc26e05d784c59d4fc86b1387625ca1150d29f4fb', 'Ariana Grande', {from: accounts[0]});
    }
    catch(error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  })

  it('should add a track', async function() {
    const Contract = await MusiciansManager.deployed();
    const result = await Contract.addTrack('0xc26e05d784c59d4fc86b1387625ca1150d29f4fb', 'Save Your Tears', 201, {from: accounts[0]});
    assert.equal(result.logs[0].args._title, "Save Your Tears", "Not equal to Save Your Tears");
  })

  it('should not add a track to an unknown artist', async function() {
    const Contract = await MusiciansManager.deployed();
    let err = null;
    try {
      await Contract.addTrack('0x9c8f6e3520f91ed82daef787de6092563c9e2eca', 'Trackkkkk', 268, {from: accounts[0]});
    }
    catch(error) {
      err = error;
    }
    assert.ok(err instanceof Error);
  })

  it('should get the track of an artist', async function() {
    const Contract = await MusiciansManager.deployed();
    const result = await Contract.getTracks('0xc26e05d784c59d4fc86b1387625ca1150d29f4fb', {from: accounts[0]});
    assert.ok(Array.isArray(result.logs[0].args._tracks, "Save Your Tears", "Not equal to Save Your Tears"));
  })
})
