#include <map>
#include <set>
#include <string>
#include <vector>

namespace Advent2018
{
    class StepSorter
    {
    public:
        StepSorter()/* :
            m_someField(0)*/
        {
        }

        void method1(const char *input)
        {
			char parentStep = 0;
			char childStep = 0;
            (void)sscanf_s(input, "Step %1c must be finished before step %1c can begin.", &parentStep, 1, &childStep, 1);
			m_childParentList[childStep].insert(parentStep);
			m_parentChildList[parentStep].insert(childStep);
			if (m_childParentList.find(parentStep) == m_childParentList.end())
			{
				NodeSetType emptySet;
				m_childParentList[parentStep] = emptySet;
			}
		}

        const char *method2()
        {
			while (m_childParentList.size())
			{
				for (auto it = m_childParentList.begin(); it != m_childParentList.end(); ++it)
				{
					auto parents = it->second;
					if (parents.size() == 0)
					{
						auto rootNode = it->first;
						auto children = m_parentChildList[rootNode];
						for (auto it2 = children.begin(); it2 != children.end(); ++it2)
						{
							m_childParentList[*it2].erase(rootNode);
						}
						m_childParentList.erase(rootNode);
						m_stepList += rootNode;
						break;
					}
				}
			}
            return m_stepList.c_str();
        }

		char pullRootNode()
		{
			for (auto it = m_childParentList.begin(); it != m_childParentList.end(); ++it)
			{
				auto parents = it->second;
				if (parents.size() == 0)
				{
					auto rootNode = it->first;
					m_childParentList.erase(rootNode);
					return rootNode;
				}
			}
			return 0;
		}

		unsigned method3()
		{
			for (size_t w = 0; w < _countof(workers); ++w)
			{
				auto rootNode = pullRootNode();
				workers[w].workNode = rootNode;
				workers[w].timeLeft = rootNode ? (rootNode - 'A' + 1 + 60) : 0;
			}

			unsigned timeSpent = 0;
			bool noWorkLeft;
			do
			{
				noWorkLeft = true;
				(void)printf("%03u:  ", timeSpent);
				for (size_t w = 0; w < _countof(workers); ++w)
				{
					(void)printf("(%c, %03u)  ", workers[w].workNode ? workers[w].workNode : '.', workers[w].timeLeft);
				}
				(void)printf("\n");
				for (size_t w = 0; w < _countof(workers); ++w)
				{
					bool workLeft = false;
					auto workNode = workers[w].workNode;
					if (workNode && workers[w].timeLeft)
					{
						--(workers[w].timeLeft);
						workLeft = true;
						if (workers[w].timeLeft == 0)
						{
							auto children = m_parentChildList[workNode];
							for (auto it2 = children.begin(); it2 != children.end(); ++it2)
							{
								m_childParentList[*it2].erase(workNode);
							}
						}
					}
					if (!workNode || workers[w].timeLeft == 0)
					{
						auto rootNode = pullRootNode();
						workers[w].workNode = rootNode;
						workers[w].timeLeft = rootNode ? (rootNode - 'A' + 1 + 60) : 0;
						workLeft = (rootNode != 0);
					}
					noWorkLeft &= !workLeft;
				}
				++timeSpent;
			} while (!noWorkLeft);
			return timeSpent;
		}

        //int64_t getSomeField() { return m_someField; }

    private:
        //typedef std::vector<int64_t> SomeVectorType;
        typedef std::set<char> NodeSetType;
		//typedef std::map<char, std::string> NodeMapType;
		typedef std::map<char, NodeSetType> NodeMapType;
		typedef struct
		{
			char workNode;
			unsigned timeLeft;
		} WorkItem;
		WorkItem workers[5];

        //int64_t m_someField;
        //SomeVectorType m_someVector;
        //SomeSetType m_someSet;
		NodeMapType m_childParentList;
		NodeMapType m_parentChildList;
		std::string m_stepList;
	};
}
