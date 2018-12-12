#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

namespace Advent2018
{
	class PlantForecaster
    {
    public:
		typedef struct
		{
			std::string pattern;
			char outcome;
		} Rule;
		typedef std::vector<Rule> Rules;
		typedef std::unordered_set<unsigned> SomeSet;
		typedef std::unordered_map<unsigned, unsigned> SomeMap;

		PlantForecaster(const char *initialState = "") :
				m_currentState("..."),
				m_padding(3),
				m_numPlants(0)
		{
			m_currentState += initialState;
			m_currentState += "...";
		}

        void addRule(const char *pattern, char outcome)
        {
			Rule rule = {pattern, outcome};
			m_rules.push_back(rule);
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

			if (result[2] == '#')
			{
				(void)result.insert(result.begin(), '.');
				++m_padding;
			}
			if (result[result.size() - 1 - 2] == '#') result += '.';

			m_currentState.assign(result);
		}

		void countPlants()
		{
			size_t sum = 0, pos = 0;
			while ((pos = m_currentState.find('#', pos)) != std::string::npos) sum += pos++ - m_padding;
			m_numPlants = sum;
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
		size_t getCurrentSize() { return m_currentState.size(); }
		char getRuleOutput() { return m_ruleOutput; }
		size_t getNumPlants() { return m_numPlants; }

    private:
		std::string m_currentState;
		char m_ruleOutput;
		size_t m_padding;
		size_t m_numPlants;
		int m_dummy;

		Rules m_rules;
    };
}
