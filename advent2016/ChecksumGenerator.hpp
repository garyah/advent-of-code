#define xDEBUG_TEST

#include <string>

namespace Advent2016
{
    class ChecksumGenerator
    {
    public:

        static std::string expand(const char *data, size_t targetLength)
        {
            std::string result(data);
#ifdef DEBUG_TEST
            unsigned count = 0;
#endif // DEBUG_TEST
            while (result.length() < targetLength)
            {
                std::string copy(result);
                size_t i = 0;
                for (size_t j = copy.length() - 1; i < copy.length() / 2; ++i, --j)
                {
                    auto temp = (invert(copy[i]));
                    copy[i] = invert(copy[j]);
                    copy[j] = temp;
                }
                if (copy.length() & 1) { copy[i] = invert(copy[i]); }
                result.append("0");
                result.append(copy);
#ifdef DEBUG_TEST
                ++count;
                if (!(count % 1)) { (void)printf("expand() iteration #%u, length %zu\n", count, result.length()); }
#endif // DEBUG_TEST
            }
            result = result.substr(0, targetLength);
            return result;
        }

        static std::string generate(const char *data)
        {
            std::string result(data);
            if (result.length() & 1) return result;
#ifdef DEBUG_TEST
            unsigned count1 = 0;
#endif // DEBUG_TEST
            while (!(result.length() & 1))
            {
                std::string temp;
#ifdef DEBUG_TEST
                unsigned count2 = 0;
#endif // DEBUG_TEST
                for (size_t i = 0; i < result.length(); i += 2)
                {
                    if (result.substr(i, 2).compare("00") == 0
                        || result.substr(i, 2).compare("11") == 0)
                    {
                        temp.append("1");
                    }
                    if (result.substr(i, 2).compare("01") == 0
                        || result.substr(i, 2).compare("10") == 0)
                    {
                        temp.append("0");
                    }
#ifdef DEBUG_TEST
                    ++count2;
                    if (!(count2 % 100000)) { (void)printf("generate() inner iteration #%u, length %zu\n", count2, temp.length()); }
#endif // DEBUG_TEST
                }
                result = temp;
#ifdef DEBUG_TEST
                ++count1;
                if (!(count1 % 1)) { (void)printf("generate() iteration #%u, length %zu\n", count1, result.length()); }
#endif // DEBUG_TEST
            }
            return result;
        }

        ChecksumGenerator() :
            m_checksum()
        {
        }

        void expandAndGenerate(const char *startData, size_t targetLength)
        {
            m_checksum = generate(expand(startData, targetLength).c_str());
        }

        const char *getChecksum() const
        {
            return m_checksum.c_str();
        }

    private:
        static char invert(char data)
        {
            if (data == '0') return '1';
            if (data == '1') return '0';
            return data;
        }

    private:
        std::string m_checksum;
    };
}
