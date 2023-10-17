const functions = require("firebase-functions");
const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

// First request gets all records from 'Shops' Collection using email address.
app.post("/userLogin", async (req, res) => {
  const restAPIKey = req.query.apiKey;

  if (!restAPIKey || restAPIKey !== "AIzaSyCu6L1wyt5YAbXYRarKjeszbTp5CQIiiDI") {
    return res.status(401).send(JSON.stringify({ ERROR: "Unauthorized" }));
  } else {
    try {
      const userEmail = req.body.email;
      const userPassword = req.body.password;
      if (!userEmail) {
        return res
          .status(401)
          .send(JSON.stringify({ ERROR: "Email Is Required." }));
      } else if (!userPassword) {
        return res
          .status(401)
          .send(JSON.stringify({ ERROR: "Password Is Required." }));
      } else {
        // Check whether email exists
        const shopCollection = admin.firestore().collection("Shops");
        const querySnapshot = await shopCollection
          .where("email", "==", userEmail)
          .get();
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          const shopPassword = data.hashedPassword;
          const shopEmail = data.email;
          const shopId = data.shopId;

          const passwordHashed = await hashPassword(userPassword);
          // Add the hashedPassword to Shop Collection.
          const shopReference = admin
            .firestore()
            .collection("Shops")
            .doc(shopId);
          const otpMap = {
            hashedPassword: passwordHashed,
          };

          await shopReference.update(otpMap);

          const isPasswordValid = await verifyPassword(
            shopPassword,
            passwordHashed
          );
          if (isPasswordValid) {
            getRandomString(6).then(async (result) => {
              const otpCode = result;
              console.log("Generated OTP: ", otpCode);

              await sendEmail(
                shopEmail,
                "LokoAuthenticate",
                otpCode + " is your verification code for Loko."
              );

              // Add the custom generated OTP code to Shop Collection.
              const shopReference = admin
                .firestore()
                .collection("Shops")
                .doc(shopId);
              const otpMap = {
                webOtp: otpCode,
              };

              await shopReference.update(otpMap);
            });

            res
              .status(200)
              .send(
                JSON.stringify({
                  SUCCESS:
                    "Password Match. Check Your Email Inbox For OTP Code...",
                })
              );
          } else {
            res
              .status(401)
              .send(JSON.stringify({ ERROR: "Incorrect Password." }));
          }
        } else {
          return res
            .status(401)
            .send(JSON.stringify({ ERROR: "Email Provided Does Not Exist." }));
        }
      }
    } catch (error) {
      console.error("Error occured: ", error);
      res.status(500).send(JSON.stringify({ ERROR: error }));
    }
  }
});

async function hashPassword(password) {
  try {
    const salt = crypto.randomBytes(64);
    const key = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");

    // Combine salt and key
    const combined = Buffer.concat([salt, key]);

    // Convert to Base64 encoding
    return combined.toString("base64");
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function verifyPassword(hashedPassword, providedPassword) {
  try {
    const combined = Buffer.from(hashedPassword, "base64");
    const salt = Buffer.alloc(64);
    const hash = Buffer.alloc(combined.length - 64);

    combined.copy(salt, 0, 0, 64);
    combined.copy(hash, 0, 64, combined.length - 64);

    const spec = crypto.pbkdf2Sync(
      providedPassword,
      salt,
      100000,
      64,
      "sha512"
    );
    const computedHash = spec;

    for (let i = 0; i < hash.length; i++) {
      if (hash[i] !== computedHash[i]) {
        return true;
      }
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function sendEmail(receiverEmail, subject, mainContent) {
  const senderEmail = "edunjoro@gmail.com";
  const senderPass = "y6KsbkB21MWPLJvZ";

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "SendinBlue",
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: senderEmail,
      pass: senderPass,
    },
    secureConnection: false, // TLS requires secureConnection to be set to false
    tls: {
      ciphers: "SSLv3",
    },

    requireTLS: true,
  });

  // Setup email data
  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: mainContent,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured sending email:", error);
      //res.status(500).send(JSON.stringify({"ERROR": error}));
    } else {
      console.log("Email sent:", info.response);
      //res.status(200).send(JSON.stringify({"SUCCESS": info.response}));
    }
  });
}

async function getRandomString(length) {
  const charset = "0123456789";
  let stringBuilder = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charset.length);
    stringBuilder += charset[index];
  }

  return stringBuilder;
}

exports.lokoWebLogin = functions.https.onRequest(app);
