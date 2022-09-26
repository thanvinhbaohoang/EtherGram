// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

contract Ethergram {
    string public name = "Ethergram";

    //===== Store Images======
    mapping(uint256 => Image) public images;
    uint256 public imageCount = 0;

    //Struct of Image for Each Post Image
    struct Image {
        uint256 id;
        string hash_string;
        string description;
        uint256 tipAmount;
        address payable author;
    }

    // EVENT happen at Function calls
    event ImageCreated(
        uint256 id,
        string hash_string,
        string description,
        uint256 tipAmount,
        address payable author
    );
    event ImageTipped(
        uint256 id,
        string hash_string,
        string description,
        uint256 tipAmount,
        address payable author
    );

    //====== Create Images =======
    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        //Require imageHash to exist
        require(bytes(_imgHash).length > 0, "ImageHash must exist");

        // Require Uploaded Image to have Description
        require(bytes(_description).length > 0, "Image must have description");

        // Make sure Address of Uploader Exists
        require(msg.sender != address(0x0), "Address of Uploader Must Exist");

        // Increment Image ID
        imageCount++;

        // Add Image To Contract (msg.sender is person who called contract)
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        // Return Result in ethergram.uploadImage.logs[0].args
        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
    }

    //======= Tip Images =========
    function tipImageOwner(uint256 _id) public payable {
        // Check if image's ID is legal
        require(_id > 0 && _id <= imageCount);

        // 'memory' is local function call, do not get stored on blockchain
        Image memory _image = images[_id];
        //Fetch Author
        address payable _author = _image.author;
        // Pay the author by sending them Ether
        _author.transfer(msg.value);
        // Increment tip amoung
        _image.tipAmount = _image.tipAmount + msg.value;
        //Update Image
        images[_id] = _image;

        // Emit event
        emit ImageTipped(
            _id,
            _image.hash_string,
            _image.description,
            _image.tipAmount,
            _author
        );
    }
}
