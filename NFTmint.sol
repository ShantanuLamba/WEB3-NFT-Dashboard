pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Minterx is ERC721, Ownable {
    uint256 public mintprice = 0.05 ether;
    uint256 public totalsupply;
    uint256 public maxsupply;
    bool public ismintenabled ; 
    mapping(address => uint256) public mintedWallets;

    constructor() payable ERC721('EXAMPLE', 'EX'){
        maxsupply = 2;
    }

    function toggleIsMintEnabled() external onlyOwner{
        ismintenabled = !ismintenabled;
    }

    function setMaxSupply(uint256 maxsupply_ )external onlyOwner{
        maxsupply = maxsupply_;
    }

    function mint() external payable{
        require(ismintenabled, "minting not enabled");
        require(mintedWallets[msg.sender] < 1, 'exceeds max');
        require(msg.value == mintprice , 'wrong value');
        require(maxsupply > totalsupply, 'sold out');

        mintedWallets[msg.sender]++ ;
        totalsupply++;
        uint256 tokenid = totalsupply ; 
        _safeMint(msg.sender, tokenid);
    }
}
