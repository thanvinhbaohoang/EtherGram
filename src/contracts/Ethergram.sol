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


    // EVENT happen after uploadImage is called
    event ImageCreated( uint id, string hash_string, string description, uint tipAmount,address author);

    //====== Create Images =======
    function uploadImage(string memory _imgHash, string memory _description) public {
        //Require imageHash to exist
        require(bytes(_imgHash).length > 0, "ImageHash must exist");
        // Require Uploaded Image to have Description
        require(bytes(_description).length > 0, "Image must have description");
        // Make sure Address of Uploader Exists
        require(msg.sender != address(0x0), "Address of Uploader Must Exist");

        // Increment Image ID
        imageCount++;

        // Add Image To Contract (msg.sender is person who called contract)
        images[imageCount] = Image(imageCount, _imgHash, _description, 0, msg.sender);

        // Return Result in ethergram.uploadImage.logs[0].args
        emit ImageCreated(imageCount, _imgHash, _description, 0 , msg.sender);
        }


    //======= Tip Images =========
    
}