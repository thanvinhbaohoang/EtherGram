// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

contract Ethergram {
    string public name ='Ethergram';
    
    //===== Store Images======
    mapping(uint => Image) public images;

    //Struct of Image for Each Post Image 
    struct Image {
        uint id;
        string hash_string;
        string description;
        uint tipAmount;
        address payable author;
    }


    //====== Create Images =======
    function uploadImage() public {
        images[1] = Image (1 ,'hashstring', 'This is first image description', 0, address(0x0));
        }


    //======= Tip Images =========
    
}