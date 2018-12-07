#include <map>
#include <set>
#include <string>
#include <vector>

namespace Advent2018
{
    class StepSorter
    {
    public:
        StepSorter() :
            m_someField(0)
        {
        }

        void method1(const char *input)
        {
			char parentStep = 0;
			char childStep = 0;
            (void)sscanf_s(input, "Step %1c must be finished before step %1c can begin.", &parentStep, 1, &childStep, 1);
			//m_childParentList[childStep] += parentStep;
			//m_parentChildList[parentStep] += childStep;
			//if (m_childParentList.find(parentStep) == m_childParentList.end()) m_childParentList[parentStep] = "";
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
			std::string stepList;
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
						stepList += rootNode;
						break;
					}
				}
			}
            return stepList.c_str();
        }

        int64_t getSomeField() { return m_someField; }

    private:
        //typedef std::vector<int64_t> SomeVectorType;
        typedef std::set<char> NodeSetType;
		//typedef std::map<char, std::string> NodeMapType;
		typedef std::map<char, NodeSetType> NodeMapType;

        int64_t m_someField;
        //SomeVectorType m_someVector;
        //SomeSetType m_someSet;
		NodeMapType m_childParentList;
		NodeMapType m_parentChildList;
	};
}
