const client = require('ssh2-sftp-client');
const path  = require('path');
const sftp  = new client();

const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('❌ Please provide the local file path as an argument.');
  process.exit(1);
}

const localFilePath = args[0];
const   hostname = args[1];
const   username = args[2];
const   pass = args[3];

const config = {
  host: hostname,
  port: 22,
  username: username,
  password: pass
};

 // file path passed from Tally or CM
//const localFilePath = 'C:/Users/sunit/Desktop/New/Newfolder/Test.xlsx';
const remoteDir = '/uploads/tally/';

async function uploadFile() {
  try {

    await sftp.connect(config);
    // Ensure remote directory exists
    await sftp.mkdir(remoteDir, true);
    const remoteFilePath = path.join(remoteDir, path.basename(localFilePath)).replace(/\\/g, '/');
    await sftp.put(localFilePath, remoteFilePath);
    
    console.log('✅ File uploaded successfully!');
  } catch (err) {
    console.error('❌ Upload failed:', err.message);
  } finally {
    sftp.end();
  }
}

//uploadFile();
