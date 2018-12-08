#include <iostream>
#include <stdint.h>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace Advent2018
{
    class TreeBuilder
    {
    public:
        TreeBuilder() :
            m_someField(0)
        {
        }

        void method1()
        {
			unsigned number;
			std::vector<unsigned> numbers;
			while (std::cin >> number) numbers.push_back(number);
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
