//#include <algorithm>
#include <iostream>
#include <queue>
//#include <stack>
//#include <stdint.h>
//#include <unordered_map>
//#include <unordered_set>
#include <vector>

namespace Advent2018
{
    class TreeBuilder
    {
    public:
        TreeBuilder() :
            m_sumOfMetadata(0),
			m_valueOfRootNode(0)
        {
        }

        void readData()
        {
			unsigned data;
			while (std::cin >> data) m_treeData.push(data);
        }

		void processSumOfMetadata()
        {
			popChildrenAndMetadata(popHeader());
        }

		void processValueOfRootNode()
		{
			m_valueOfRootNode = popChildrenAndMetadataForRoot(popHeader());
		}

		unsigned getSumOfMetadata() { return m_sumOfMetadata; }
		unsigned getValueOfRootNode() { return m_valueOfRootNode; }

    private:
		typedef std::queue<unsigned> TreeData;
		typedef struct
		{
			unsigned numChildren, numMetadata;
		} Header;
		typedef std::vector<unsigned> ChildValues;

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

		unsigned popChildrenAndMetadataForRoot(Header header)
		{
			unsigned nodeValue = 0;
			ChildValues childValues;
			for (unsigned i = 0; i < header.numChildren; ++i)
			{
				childValues.push_back(popChildrenAndMetadataForRoot(popHeader()));
			}
			for (unsigned i = 0; i < header.numMetadata; ++i)
			{
				if (header.numChildren == 0)
				{
					nodeValue += popMetadata();
				}
				else
				{
					auto childIndex = popMetadata();
					if (childIndex > 0 && childIndex <= childValues.size())
					{
						nodeValue += childValues[childIndex - 1];
					}
				}
			}
			return nodeValue;
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
		unsigned m_sumOfMetadata;
		unsigned m_valueOfRootNode;
    };
}
