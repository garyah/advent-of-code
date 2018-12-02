#include <unordered_map>
#include <unordered_set>
#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class BlankClass
    {
    public:
        BlankClass() :
            m_someField(0)
        {
        }

        void method1(const char *input)
        {
            int64_t someVariable = 0;
            (void)sscanf_s(input, "%lld", &someVariable);
            m_someField = someVariable;
        }

        int64_t method2()
        {
            return m_someField;
        }

        int64_t getSomeField() { return m_someField; }

    private:
        typedef std::vector<int64_t> SomeVectorType;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

        int64_t m_someField;
        SomeVectorType m_someVector;
        SomeSetType m_someSet;
        SomeMapType m_someMap;
    };
}
