#include <unordered_map>
#include <unordered_set>
#include <string>
#include <vector>

namespace Advent2018
{
	class BlankClass
    {
    public:
		typedef std::vector<unsigned> SomeVector;
		typedef std::unordered_set<unsigned> SomeSet;
		typedef std::unordered_map<unsigned, unsigned> SomeMap;

		BlankClass(unsigned field1 = 0,
				   int field2 = 0,
				   const char *field3 = "",
				   int dummy = 0) :
			m_field1(field1),
			m_field2(field2),
			m_field3(field3),
			m_dummy(dummy)
		{
        }

        void method1(unsigned first = 0u, int second = 0, const char *third = "")
        {
        }

		void method2()
        {
        }

		void helper1(unsigned first = 0u, int second = 0, const char *third = "")
		{
		}

		void helper2()
		{
		}

		unsigned getField1() { return m_field1; }
		int getField2() { return m_field2; }
		const char *getField3() { return m_field3.c_str(); }

    private:
		unsigned m_field1;
		int m_field2;
		std::string m_field3;
		int m_dummy;

		SomeVector m_someVector;
        SomeSet m_someSet;
        SomeMap m_someMap;
    };
}
