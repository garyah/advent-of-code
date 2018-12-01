#include <stdio.h>
#include <string.h>
#include <string>

#include "../common/md5.h"
#define MD5_DIGEST_LENGTH 16

namespace Advent2016
{
    class HashInputGenerator
    {
    public:
        HashInputGenerator() :
            m_hashInputDecimal(1),
            m_mdString()
        {
        }

        void generate(const char *secretKey, unsigned startingHashInputDecimal = 1, const char *requiredHashPrefix = "00000")
        {
            std::string prefix(requiredHashPrefix);
            for (unsigned hashInputDecimal = startingHashInputDecimal; ; ++hashInputDecimal)
            {
                char hashInput[1000 + 1] = {0};
                (void)snprintf(hashInput, sizeof(hashInput), "%s%u", secretKey, hashInputDecimal);

                MD5_CTX ctx = { 0 };
                MD5_Init(&ctx);
                MD5_Update(&ctx, hashInput, static_cast<unsigned long>(strlen(hashInput)));

                unsigned char md[MD5_DIGEST_LENGTH] = {0};
                MD5_Final(md, &ctx);

                char mdCString[MD5_DIGEST_LENGTH * 2 + 1] = {0};
                hashOutputToString(md, mdCString);

                std::string mdString(mdCString);
                if (0 == mdString.compare(0, prefix.length(), prefix))
                {
                    // the hash output has the required prefix, squirrel away values and return
                    m_hashInputDecimal = hashInputDecimal;
                    m_mdString = mdString;
                    return;
                }
            }
        }

        unsigned getHashInputDecimal() const
        {
            return m_hashInputDecimal;
        }

        const char *getHashOutputString() const
        {
            return m_mdString.c_str();
        }

    private:
        void hashOutputToString(unsigned char *md, char *mdString)
        {
            char *outPtr = mdString;
            for (int i = 0; i < MD5_DIGEST_LENGTH; ++i)
            {
                (void)sprintf(outPtr, "%02x", md[i]);
                outPtr += 2;
            }
        }

    private:
        unsigned m_hashInputDecimal;
        std::string m_mdString;
    };
}
