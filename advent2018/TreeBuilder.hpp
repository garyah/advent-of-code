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

        void readData()
        {
			unsigned data;
			while (std::cin >> data) m_treeData.push_back(data);
        }

        int64_t method2()
        {
            return m_someField;
        }

        int64_t getSomeField() { return m_someField; }

    private:
        typedef std::vector<unsigned> TreeData;
        typedef std::unordered_set<int64_t> SomeSetType;
        typedef std::unordered_map<int64_t, unsigned> SomeMapType;

        int64_t m_someField;
		TreeData m_treeData;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
