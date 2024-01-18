/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <bits/stdc++.h>

using namespace std;

int w = 3;
int m = 0;

void key_generation(int private_key[4], int (&public_key)[4])
{

    for (int i = 0; i < 4; i++)
    {
        m += private_key[i];
    }

    cout << m << endl;
    srand(time(NULL));

    // do{

    //     w = rand()%(m - 2 + 1) + 2;

    // }
    // while(__gcd(m , w) != 1);

    cout << w << endl;

    for (int i = 0; i < 4; i++)
    {
        public_key[i] = (private_key[i] * w) % m;
    }

    for (int i = 0; i < 4; i++)
    {
        cout << public_key[i] << " ";
    }

    cout << endl;
}

int multiplicative_inverse(int w, int m)
{

    int r1 = m;
    int r2 = w;
    int t1 = 0;
    int t2 = 1;
    int r;
    int t;
    while (r2 > 0)
    {
        int q = r1 / r2;
        r = r1 - (q * r2);
        r1 = r2;
        r2 = r;
        t = t1 - (q * t2);
        t1 = t2;
        t2 = t;
    }
    if (t1 < 0)
        t1 += m;
    return t1;
}

int encryption(int message[4], int public_key[4])
{
    int s = 0;

    for (int i = 0; i < 4; i++)
    {
        s += (message[i] * public_key[i]);
    }

    return s;
}

void decryption(int s, int private_key[4], int (&plain_text)[4])
{
    int inverse_w = multiplicative_inverse(w, m);
    cout << inverse_w << endl;

    int sum = (inverse_w * s) % m;
    cout << sum << endl;

    for (int i = 3; i >= 0; i--)
    {
        if (sum >= private_key[i])
        {
            plain_text[i] = 1;
            sum -= private_key[i];
        }
        else
        {
            plain_text[i] = 0;
        }
    }
}

int main()
{
    int private_key[4] = {7, 15, 25, 50};

    int public_key[4] = {0};
    key_generation(private_key, public_key);

    int message[4] = {1, 0, 1, 0};

    int s = encryption(message, public_key);
    cout << s << endl;
    int plain_text[4] = {0};

    decryption(s, private_key, plain_text);

    for (int i = 0; i < 4; i++)
    {
        cout << plain_text[i] << " ";
    }

    return 0;
}
