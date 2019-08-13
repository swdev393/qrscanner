# qrscanner
simple QR Scanner using PHP and Javascript based on the instascan repo by schmich.

# Instructions
1. make sure to have PHP installed and able to display your website.
2. make sure to have SSL configured correctly, otherwise the video will not stream.
3. copy the files into your website.
4. update the permissions to the /scans directory to allow all users to read/write, otherwise you may get permission denied error when you try to send scans to the server.
5. (optional) replace the '/sound/your-sound-file.mp3' file with a valid mp3 file and uncomment the following lines in the qrscan.js file:

        //var audio = new Audio('sound/[your-sound-file.mp3]');
        //audio.play();  
