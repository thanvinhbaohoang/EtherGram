// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

contract Ethergram {
    string public name ='Ethergram';
    
    //===== Store Images======
    mapping(uint => Image) public images;
    uint public imageCount = 0;


    //Struct of Image for Each Post Image 
    struct Image {
        uint id;
        string hash_string;
        string description;
        uint tipAmount;
        address author;
    }


    //====== Create Images =======
    function uploadImage(string memory _imgHash, string memory _description) public {
        // Increment Image ID
        imageCount++;

        // Add Image To Contract (msg.sender is person who called contract)
        images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);
        }


    //======= Tip Images =========
    
}