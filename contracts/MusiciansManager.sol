// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MusiciansManager {

  event musicianCreated(string _artistName);
  event trackAdded(string _artistName, string _title);
  event getTheTracks(Track[] _tracks);

  struct Track {
    string _title;
    uint _duration;
  }

  struct Musician {
    string _artistName;
    Track[] _tracks;
  }

  mapping(address => Musician) Musicians;

  address owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(owner == msg.sender, 'Your not the owner');
    _;
  }

  function addMusician(address _musicianAddress, string memory _artistName) external onlyOwner {
    // On vérifie si on a pas déjà ajouté ce musicien
    // On met 'bytes' sinon le '.length' ne fonctionne pas
    require(bytes(Musicians[_musicianAddress]._artistName).length == 0, 'this musician already exist');
    // Si il n'existe pas on l'ajoute
    Musicians[_musicianAddress]._artistName = _artistName;
    // On emet l'evenement
    emit musicianCreated(_artistName);
  }

  function addTrack(address _musicianAddress, string memory _title, uint _duration) external onlyOwner {
    // On vérifie que le musicien existe bel et bien avant de lui ajouter une track
    require(bytes(Musicians[_musicianAddress]._artistName).length > 0, 'this musician does not exist');
    // On va créer la structure Track pour la track que l'on souhaite créer
    Track memory thisTrack = Track(_title, _duration);
    // Dans les tracks du musicien on va ajouter la track que l'on vient de créer
    Musicians[_musicianAddress]._tracks.push(thisTrack);
    // On emet l'event
    emit trackAdded(Musicians[_musicianAddress]._artistName, _title);
  }

  function getTracks(address _musicianAddress) external {
    emit getTheTracks(Musicians[_musicianAddress]._tracks);
  }
}
