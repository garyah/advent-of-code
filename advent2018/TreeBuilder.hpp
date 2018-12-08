//#include <algorithm>
#include <iostream>
#include <queue>
//#include <stack>
//#include <stdint.h>
//#include <unordered_map>
//#include <unordered_set>
//#include <vector>

namespace Advent2018
{
    class TreeBuilder
    {
    public:
        TreeBuilder() :
            m_sumOfMetadata(0)
        {
        }

        void readData()
        {
			unsigned data;
			while (std::cin >> data) m_treeData.push(data);
        }

		void processMetadata()
        {
			popChildrenAndMetadata(popHeader());

			//std::for_each(m_treeData.begin(), m_treeData.end(), [](unsigned data)
			//{
			//});
        }

		unsigned getSumOfMetadata() { return m_sumOfMetadata; }

    private:
		typedef std::queue<unsigned> TreeData;
		typedef struct
		{
			unsigned numChildren, numMetadata;
		} Header;
		//typedef std::stack<unsigned> NumChildrenStack;
		//typedef std::unordered_set<unsigned> SomeSetType;
  //      typedef std::unordered_map<unsigned, unsigned> SomeMapType;

		void popChildrenAndMetadata(Header header)
		{
			for (unsigned i = 0; i < header.numChildren; ++i)
			{
				popChildrenAndMetadata(popHeader());
			}
			for (unsigned i = 0; i < header.numMetadata; ++i)
			{
				m_sumOfMetadata += popMetadata();
			}
		}

		Header popHeader()
		{
			Header header;
			header.numChildren = m_treeData.front();
			m_treeData.pop();
			header.numMetadata = m_treeData.front();
			m_treeData.pop();
			return header;
		}

		unsigned popMetadata()
		{
			auto metadata = m_treeData.front();
			m_treeData.pop();
			return metadata;
		}

		TreeData m_treeData;
		//NumChildrenStack m_numChildrenStack;
		unsigned m_sumOfMetadata;
		//SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
