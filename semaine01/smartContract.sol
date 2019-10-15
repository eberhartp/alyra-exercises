pragma solidity 0.5.11;

contract SceneOuverte {
    //0xb93b07529c3E1Da542D24127dE78CFe50D43D1Dc
    string[12] passagesArtistes;
    uint creneauxLibres = 12;
    uint tour = 0;
    
    function sInscrire(string memory _nomDArtiste) public {
        if (creneauxLibres > 0) {
            passagesArtistes[12 - creneauxLibres] = _nomDArtiste;
            creneauxLibres--;
        }
    }
    
    function passagesArtisteSuivant() public {
        tour++;
    }
    
    function artisteEnCours() public view returns (string memory) {
        if (tour > (12 - creneauxLibres))
            return "FIN";
        return passagesArtistes[tour];
    }
}
