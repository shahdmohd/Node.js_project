import addressModel from "../../Database/Models/Address.model.js";

let addAddress = async (req, res) => {
    req.body.user = req.decoded._id;
    let newAddress = await addressModel.create(req.body);
    res.status(201).json({ message: "Address added successfully", data: newAddress });
}

let getAddresses = async (req, res) => {
    let addresses = await addressModel.find({ user: req.decoded._id });
    res.status(200).json({ message: "List of Addresses", data: addresses });
}

let getAddressById = async (req, res) => {
    let { addressID } = req.params;
    let address = await addressModel.findById(addressID);
    if (!address) {
        return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address details", data: address });
}

let updateAddress = async (req, res) => {
    let { addressID } = req.params;
    let updatedAddress = await addressModel.findByIdAndUpdate(addressID, req.body, { new: true });
    res.status(200).json({ message: "Address updated successfully", data: updatedAddress });
}

let deleteAddress = async (req, res) => {
    let { addressID } = req.params;
    await addressModel.findByIdAndDelete(addressID);
    res.status(200).json({ message: "Address deleted successfully" });
}

export { addAddress, getAddresses, getAddressById, updateAddress, deleteAddress };