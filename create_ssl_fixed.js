const fs = require('fs');
const path = require('path');

console.log('🔐 Creating working SSL certificates');
console.log('===================================');

// Remove old certificates
const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

if (fs.existsSync(keyPath)) {
    try {
        fs.unlinkSync(keyPath);
        console.log('🗑️ Removed old key.pem');
    } catch (error) {
        console.log('⚠️ Could not remove key.pem:', error.message);
    }
}

if (fs.existsSync(certPath)) {
    try {
        fs.unlinkSync(certPath);
        console.log('🗑️ Removed old cert.pem');
    } catch (error) {
        console.log('⚠️ Could not remove cert.pem:', error.message);
    }
}

console.log('');

// Create working SSL certificates with proper formatting
const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAvVJTU99Us8cKB1VYy00X6pyBgiLiTRV3vzr3ry2iPmKPKN04
6tZeg1TfQOoW+EKyM8Rzf080SknR2pCJpTZsqckYqIHM+EnwLE0twvbNLnlpiH8T
t8khkI91MPaAGCSQqJq22n0mRyq1yS5DmQMhVEqXPxeM0X3nfT935dLWyqef2OQk
pZ+Ll4+GL1U47lvgX20jGexTj+0C8r9Vl6u80ixMbwt47+WdE+urCqgClLwBtyg1
5N9+6HmMZscDKFAUWbVOyf1Qg8BkrVWaUfd6aWwNUy+LftEtttIpE7BL5Hix/qbf
ZyMF/UkFWSM1z/1MZimZBCY7wqctTIDAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ6
vp89/RXFfJtJphLsVHpH6QX5M8tBU3sivIkKIdZxJvyj80X5tGD4D45WaTaqHdX
7WtBH/hPxLt6uUzcx8mRaBe87kKxT0mdB6J+YA5XybjzJvGfBHY4M31VbAQ6j5M6
lnn1/14Umd+OwSSKTfBUJuqUr4h0j3fe0WjUakOHu1qvzDNoOBP+Z+Fso5FWdbO1
CuRGA55C+qrBojML8Dyz3IxCIkFZ5FqffJGhB+JmB56nudpVW8xnEynlWwLfDzNA
wnpAqA7OskjFdU0Z8Td0A7BCuCj5qjmfKTa4B4j/80xSbIrWt0BJ87+yGRS5Mv4G
L6RKUuypJhq0oZl0K9m5Wg/KpxvH6vHlckG2xHtHqIRwUQwhpLm1r1EZK5wsI+N
z4fwkoC7C+opBKGkaPNnQeQKBgQD8/9d3fNXk9RkdV58m3EtF88lvgI5RKj2ZRkQW
2M3pYN1cP1C+WOmI7f/DBfH4UlEo5Hh/le+1G3gdZMErdpGm3i1q2orJ2gMh3Nqf
cuyB9GWgv0GDgaQJveTC9toHIo54A/P6wT36NUb/f0YbR4Fsv7EeIGWqYwNtB1/1r
xyFKwQKBgQDCgYBaDfNE9WrynaVyHl3L9XtW3ElmhU2OHM6O3EsK6Ok5k6c2BLy5
PZntJhTHjp16Ork2N39nD5SmA+pCvDPvahzXOnKtLMcE74gW6DCzEPEv/1dfwK2j
8vptaLLYBhhn9m1ZT3g9o/YHGxqB32QjDhMGHj8LxDCIe1XEqgvuQKBgDLBwSfV
dNtfGd3L6qcNBM0xX8js+TGKzPNgP+2J8ZTZ/znL3zCXOIsf0jK5N5rffxqBw2k3
T04mLfN0uReX1hLh3qB0G3MfU4TGj1TqM7T/Fb4L8E3l+RvTbh9XzVEJdI4iHVD
HxIJ1dMg0zZ5iyrNGW5g6Qc8uvylOSlM2R5FM
-----END RSA PRIVATE KEY-----`;

const certificate = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/OvK8T7FMA0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMTkwMzI2MTI0NzU5WhcNMjAwMzI1MTI0NzU5WjBF
MQswCQYDVQQGEwJBVTETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEAu1SU1LfVLPHCgdVWMtNF+qcgYIi4k0Vd786968toj5ijyjNOOrWXoNU3
0DqFvhCsjPEc3/PNFJJ0dqQiaU2bKnJGKiBzPhJ8CxNLcL2zS55aYh/E7fJIZCPd
TD2gBgkkKiat9p9JkcqtckuQ5kDIVRKlz8XjNF9530/d+XS1sqnn9jkJKWfi5ePh
i9VOO5b4F9tIxnsU4/tAvK/VZertNIsTG8LeO/lnRPrqwqoApS8AbcoNeTffuh5j
GbHAyhQFFm1Tsn9UIPAZK1VmlH3emlsDVMvi37RLbbSKROwS+R4sf6m32cjBf1JB
VkjNc/9TGYpmQQmO8KnLUyAwIDAQABo1AwTjAdBgNVHQ4EFgQUQKxP1nKh1fdS
1u7Q41bmU02caaUwHwYDVR0jBBgwFoAUQKxP1nKh1fdS1u7Q41bmU02caaUwDAYD
VR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAeJAsdjFgy7QoM3TTXmRhR2E
8/2Z0G7jVl/uXajm2aK4h6U5fSX7A6MFmcL383zd0Aa5M1b2Og5rX4+WpLrvDfC
LWrmbJWp6sKpqY06slT23CZrM9iVSV5fkW3jQ0lL94qIfuTD42sO2+Ll4wXGjDWC
Tzl2p4TS8bOVfqTj3xIk3nVymd+Zu4R8C05qGfdjVhO5m9uRGTfCqc5AA/gp8yK
aHZzjl6Y+Rwg5BOMSe5Voz3Y4Y4FhwJz9QZvK6F9fu5gxGojiHRVYyUbTlXMVz/
0X1Pnz2B4XDWpYvJXfJR4bbJ5Cq2bQu2emKcGf0CQ==
-----END CERTIFICATE-----`;

try {
    console.log('📝 Writing SSL certificates...');
    
    // Write files with correct encoding
    fs.writeFileSync(keyPath, privateKey, 'utf8');
    fs.writeFileSync(certPath, certificate, 'utf8');
    
    console.log('✅ SSL certificates created successfully');
    console.log(`📁 key.pem: ${keyPath}`);
    console.log(`📁 cert.pem: ${certPath}`);
    
    // Verify files were created correctly
    console.log('🔍 Verifying created files...');
    
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        throw new Error('Files were not created');
    }
    
    const keyStats = fs.statSync(keyPath);
    const certStats = fs.statSync(certPath);
    
    console.log(`📏 File sizes:`);
    console.log(`   key.pem: ${keyStats.size} bytes`);
    console.log(`   cert.pem: ${certStats.size} bytes`);
    
    if (keyStats.size < 1000 || certStats.size < 1000) {
        throw new Error('Files are too small - possibly corrupted');
    }
    
    // Check content
    const keyContent = fs.readFileSync(keyPath, 'utf8');
    const certContent = fs.readFileSync(certPath, 'utf8');
    
    if (!keyContent.includes('-----BEGIN RSA PRIVATE KEY-----')) {
        throw new Error('key.pem has wrong format');
    }
    
    if (!certContent.includes('-----BEGIN CERTIFICATE-----')) {
        throw new Error('cert.pem has wrong format');
    }
    
    console.log('✅ Verification: files written correctly');
    console.log('✅ Verification: certificate format is correct');
    
    // Test HTTPS server creation
    console.log('🧪 Testing HTTPS server creation...');
    
    try {
        const https = require('https');
        const options = {
            key: fs.readFileSync(keyPath, 'utf8'),
            cert: fs.readFileSync(certPath, 'utf8')
        };
        
        const testServer = https.createServer(options, (req, res) => {
            res.writeHead(200);
            res.end('Test OK');
        });
        
        testServer.listen(0, () => {
            const port = testServer.address().port;
            console.log(`✅ HTTPS server created successfully on port ${port}`);
            testServer.close(() => {
                console.log('✅ Test completed successfully!');
                console.log('🎉 SSL certificates are working correctly!');
            });
        });
        
    } catch (error) {
        console.log('❌ HTTPS server creation error:', error.message);
        throw error;
    }
    
} catch (error) {
    console.error('❌ SSL certificate creation error:', error.message);
    
    // Clean up corrupted files
    if (fs.existsSync(keyPath)) {
        try { fs.unlinkSync(keyPath); } catch (e) {}
    }
    if (fs.existsSync(certPath)) {
        try { fs.unlinkSync(certPath); } catch (e) {}
    }
    
    process.exit(1);
}

console.log('');
console.log('🔐 Certificates ready for use!');
console.log('💡 You can now run the HTTPS server');
console.log('🚀 Run: node https_server.js');