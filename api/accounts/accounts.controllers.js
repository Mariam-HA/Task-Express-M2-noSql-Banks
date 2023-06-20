let accounts = require("../../accounts");

const Account = require("../../db/models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body); //-> to save it in the MongoDB database
    //async/await syntax to handle the asynchronous
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);

    if (foundAccount) {
      await Account.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);

    if (!foundAccount) {
      return res.status(404).json({ message: "Accpunt not found" });
    }
    await foundAccount.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "somthing went wrong" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const account = await Account.find().select("-createdAt -updatedAt");
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: "Somthing went wrong" });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};

// exports.accountUpdate = async (req, res) => {
//   const { accountId } = req.params;
//   try {
//     const foundAccount = await Account.findById(accountId);

//     if (foundAccount) {
//       await Account.findByIdAndUpdate(accountId, req.body);
//       res.status(204).end();
//       //204 == No Content
//     } else {
//       res.status(404).json({ message: "Account not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "somthing went wrong" });
//   }
// };
