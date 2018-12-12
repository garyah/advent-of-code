//#include <list>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace Advent2018
{
	class BlankClass
    {
    public:
		typedef struct
		{
			std::string pattern;
			char outcome;
		} Rule;
		typedef std::vector<Rule> Rules;
		//typedef std::list<bool> Pots;
		typedef std::unordered_set<unsigned> SomeSet;
		typedef std::unordered_map<unsigned, unsigned> SomeMap;

		BlankClass(const char *initialState = "",
				   //int field2 = 0,
				   //const char *field3 = "",
				   int dummy = 0) :
				m_currentState("..."),
				//m_field2(field2),
				m_dummy(dummy)
		{
			m_currentState += initialState;
			m_currentState += "...";
		}

        void addRule(const char *pattern, char outcome)
        {
			Rule rule = {pattern, outcome};
			m_rules.push_back(rule);
        }

		void method2()
        {
        }

		void processState()
		{
			std::string result(m_currentState.substr(0, 2));
			size_t i = 0;
			for (i = 2; i < m_currentState.size() - 2; ++i)
			{
				executeRules(m_currentState.substr(i - 2, 5).c_str());
				result += m_ruleOutput;
			}
			result += m_currentState.substr(i, 2);
			if (result[2] == '#') (void)result.insert(result.begin(), '.');
			if (result[result.size() - 1 - 2] == '#') result += '.';
			m_currentState.assign(result);
		}

		void executeRules(const char *input)
		{
			for (auto it = m_rules.begin(); it != m_rules.end(); ++it)
			{
				if (executeRule(input, it->pattern.c_str(), it->outcome)) return;
			}
			// just to accommodate incomplete rule sets, such as with sample input
			m_ruleOutput = '.';
		}

		bool executeRule(const char *input, const char *pattern, char outcome)
		{
			bool gotMatch = false;
			std::string ruleOutput(input);
			if (ruleOutput.compare(pattern) == 0)
			{
				ruleOutput[2] = outcome;
				gotMatch = true;
			}
			m_ruleOutput = ruleOutput[2];
			return gotMatch;
		}

		const char *getCurrentState() { return m_currentState.c_str(); }
		//int getField2() { return m_field2; }
		char getRuleOutput() { return m_ruleOutput; }

    private:
		std::string m_currentState;
		//int m_field2;
		char m_ruleOutput;
		int m_dummy;

		Rules m_rules;
		//Pots m_pots;
        //SomeSet m_someSet;
        //SomeMap m_someMap;
    };
}
